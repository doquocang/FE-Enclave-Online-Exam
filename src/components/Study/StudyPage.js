import { Layout} from "antd";

import "./StudyPage.scss";
import StudyListIcon from "./StudyListIcon";
import StudyList from "./StudyList";
import Search from "antd/es/transfer/search";

import "./StudyPage.scss";
import SearchBox from "./SearchBox";
import StudyQuestion from "./StudyQuestion";

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const { Header, Sider, Content } = Layout;

const StudyPage = () => {
  const location = useLocation();
  const selectedSubQuestion = queryString.parse(location.search);

  return (
    <Layout>
      {/* sider-study-list */}
      <Sider className="siderbar" theme="light">
        <StudyListIcon />
        <div className="sidebar-header">Studying</div>
        <StudyList />
      </Sider>
      {/* search */}
      {Object.keys(selectedSubQuestion).length > 0 ? (
        <Content className="question-content">
          <StudyQuestion selectedSubQuestion={selectedSubQuestion} />
        </Content>
      ) : (
        <Content className="search-content">
          <div className="search-content-header">Learn to Code, English</div>
          <SearchBox className="search-box"/> 
          <div className="search-content-footer"> We engineer our clients' successes!</div>
        </Content>
      )}
    </Layout>
  );
};

export default StudyPage;