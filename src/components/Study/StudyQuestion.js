import { useEffect, useState } from "react";
import { Flex, Card, Divider, Button, Pagination } from "antd";
import "./StudyQuestion.scss";
import parse from "html-react-parser";

//pagination
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

//mock data
import response from "./json/coanh/page1.json";
import response2 from "./json/coanh/page2.json";
import response3 from "./json/coanh/page3.json";

import audioFile from "../../assets/Audio/test1.mp3";

const StudyQuestion = (props) => {
  const [questionData, setQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const onChangePagination = (pageNumber) => {
    // Cập nhật pageNumber trong URL mà không cần tải lại trang
    const queryParams = queryString.parse(location.search);
    const newQueryParams = {
      ...queryParams,
      pageNumber: pageNumber,
    };
    navigate(`?${queryString.stringify(newQueryParams, { sort: false })}`);
  };

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const { subSectionId, pageNumber, pageSize } = queryParams;
    setCurrentPage(parseInt(pageNumber, 10));

    setQuestionData(response.result);

    if (pageNumber === "2") setQuestionData(response2.result);

    if (pageNumber === "3") setQuestionData(response3.result);

    window.scrollTo(0, 0);
  }, [location.search]);

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <Flex className="study-questions" vertical gap="large">
      <Divider className="study-questions-lesson" orientation="left">
        English - TOEIC Test - Learning - Part 1
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
                    video
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
                        {item.SubQuestionUrl && (
                          <Flex className="study-question-quiz-url" vertical>
                            {/* !!!callAPI */} Anh
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
                    gap="small"
                    align="center"
                  >
                    {/* "AnswerContent" */}
                    {item.Answers.map((answer, answerIndex) => (
                      <Button
                        key={answerIndex}
                        className="study-question-quiz-answers"
                        block
                      >
                        <Flex className="study-question-quiz-answers-content">
                          {answer.AnswerContent}
                        </Flex>
                      </Button>
                    ))}
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
          total={85}
          onChange={onChangePagination}
        />
      </Flex>
    </Flex>
  );
};

export default StudyQuestion;
