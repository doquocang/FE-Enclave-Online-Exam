import { useEffect, useState } from "react";
import { Flex, Card, Divider, Image, Pagination, Radio } from "antd";
import "./StudyQuestion.scss";
import parse from "html-react-parser";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

//api
import { fetchQuestionsApi, fetchImageApi } from "../../services/UserService";

//pagination
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

import jsonData from "./test2.json";

import audioFile from "../../assets/Audio/test1.mp3";

const StudyQuestion = (props) => {
  const [questionData, setQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isHavingImage, setIsHavingImage] = useState(false);
  
  const { selectedSubQuestion } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);

  const onChangePagination = (pageNumber) => {
    // Cập nhật pageNumber trong URL mà không cần tải lại trang
    const newQueryParams = {
      ...queryParams,
      pageNumber: pageNumber,
    };
    navigate(`?${queryString.stringify(newQueryParams, { sort: false })}`);
  };

  const onChangeQuestion = (e) => {
    const answer = e.target.value;
    if (!selectedAnswers.find((a) => a.AnswerId === answer.AnswerId)) {
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  };

  const findSubSectionPath = (data, subSectionId) => {
    const search = (children, path) => {
      for (const child of children) {
        const newPath = [
          ...path,
          child.Name ||
            child.SubjectName ||
            child.CategoryName ||
            child.MainSectionName ||
            child.SubSectionName,
        ];
        if (child.SubSectionId === subSectionId) {
          return newPath.join(" - ");
        }
        if (child.Children) {
          const result = search(child.Children, newPath);
          if (result) return result;
        }
      }
    };
    return search(data.result, []);
  };

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const { subSectionId, pageNumber, pageSize } = queryParams;
    setCurrentPage(parseInt(pageNumber, 10));

    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const response = await fetchQuestionsApi(
        token,
        subSectionId,
        pageNumber,
        pageSize
      );
      setTotalPage(response.pagination.TotalPages);
      setQuestionData(response.result);
    };
    fetchData();

    

    window.scrollTo(0, 0);
  }, [location.search]);

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <Flex className="study-questions" vertical gap="large">
      <Divider className="study-questions-lesson" orientation="left">
        {findSubSectionPath(
          jsonData,
          parseInt(selectedSubQuestion.subSectionId, 10)
        )}
      </Divider>
      {/* tất cả direction lẫn câu hỏi + đáp án */}
      {questionData.map((item, index) => {
        const preItem = questionData[index - 1];
        return (
          <Flex key={index} className="study-question-container" vertical>
            {/* "MainQuestionContent" || "NormalQuestionContent" || */}
            {/* MainQuestion */}
            {item.MainQuestionId &&
            (!preItem || item.MainQuestionId !== preItem.MainQuestionId) ? (
              <>
                <div className="study-question-direction">
                  {parse(`${item.MainQuestionContent}`)}
                </div>
                {/* xurl audio ton tai thi xuat ra */}
                {item.MainQuestionUrl && (
                  <Flex
                    className="study-question-main-nor-url"
                    vertical
                    align="center"
                  >
                    <audio
                      className="study-question-main-nor-url-content"
                      controls
                    >
                      <source src={audioFile} type="audio/mp3" />
                    </audio>
                    {/* video */}
                  </Flex>
                )}
              </>
            ) : null}
            {/* NormalQuestion */}
            {!preItem && item.NormalQuestionContent ? (
              <div className="study-question-direction">
                Choose A, B, C or D to complete the sentences
                {/* {parse(`${item.NormalQuestionContent}`)} */}
              </div>
            ) : null}
            {/* khung tất cả câu hỏi (câu hỏi + đáp án)*/}
            <Flex className="study-question-content" vertical align="center">
              <Flex className="study-question-wrapper" vertical gap="middle">
                {/* Many SubQuestionContent - khung câu hỏi (câu hỏi + đáp án) */}
                <Card
                  className="study-question-quiz"
                  title={
                    // NormalQuestionTitle
                    item.NormalQuestionContent ? (
                      <>
                        {/* "SubQuestionContent" - câu hỏi */}
                        <div className="study-question-quiz-titles">
                          {parse(`${item.NormalQuestionContent}`)}
                        </div>
                      </>
                    ) : (
                      // MainQuestionTitle
                      <>
                        {/* "SubQuestionContent" - câu hỏi */}
                        <div className="study-question-quiz-titles">
                          {parse(`${item.SubQuestionContent}`)}
                        </div>
                        {item.isHavingImage && setIsHavingImage(true)}
                        {item.SubQuestionUrl && (
                          <Flex className="study-question-quiz-url" vertical>
                            {/* !!!callAPI anh */}
                            <Image
                              width={200}
                              src=""
                            />
                          </Flex>
                        )}
                      </>
                    )
                  }
                >
                  {/* "Answers" - đáp án */}
                  <Flex
                    className="study-question-quiz-answers-wrapper"
                    vertical
                  >
                    {/* "AnswerContent" */}
                    <Radio.Group
                      className="study-question-quiz-answers-group custom-radio-button"
                      onChange={onChangeQuestion}
                      size="large"
                      buttonStyle="solid"
                    >
                      <Flex vertical gap="middle" align="center">
                        {item.Answers.map((answer, answerIndex) => (
                          <Radio.Button
                            className={`study-question-quiz-answers ${
                              selectedAnswers &&
                              selectedAnswers.some(
                                (a) => a.AnswerId === answer.AnswerId
                              )
                                ? answer.CorrectAnswer
                                  ? "correct-answer"
                                  : "wrong-answer"
                                : ""
                            }`}
                            value={answer}
                            key={answer.AnswerId}
                          >
                            <Flex className="study-question-quiz-answers-content">
                              {answer.AnswerContent}
                              {selectedAnswers &&
                                selectedAnswers.some(
                                  (a) => a.AnswerId === answer.AnswerId
                                ) &&
                                (answer.CorrectAnswer ? (
                                  <CheckCircleFilled className="study-question-quiz-answers-icon" />
                                ) : (
                                  <CloseCircleFilled className="study-question-quiz-answers-icon" />
                                ))}
                            </Flex>
                          </Radio.Button>
                        ))}
                      </Flex>
                    </Radio.Group>
                  </Flex>
                </Card>
              </Flex>
            </Flex>
          </Flex>
        );
      })}

      <Flex className="study-question-footer" justify="center">
        <Pagination
          className="study-question-pagination"
          showQuickJumper
          showSizeChanger={false}
          current={currentPage}
          total={totalPage}
          pageSize={10}
          onChange={onChangePagination}
        />
      </Flex>
    </Flex>
  );
};

export default StudyQuestion;
