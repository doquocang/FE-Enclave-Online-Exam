import { Layout } from "antd";

import "./StudyPage.scss";
import StudyListIcon from "./StudyListIcon";
import StudyList from "./StudyList";
import Search from "antd/es/transfer/search";

import "./StudyPage.scss";
import SearchBox from "./SearchBox";

const { Header, Sider, Content } = Layout;

const StudyPage = () => {
  return (
    <Layout>
      {/* sider-study-list */}
      <Sider className="siderbar" theme="light">
        <StudyListIcon />
        <div className="sidebar-header">Studying</div>
        <StudyList />
      </Sider>
      {/* main-content */}
      <Content className="main-content">
        <div className="main-content-header">Learn to Code, English</div>
        <SearchBox className="search-box"/> 
        <div className="main-content-footer"> We engineer our clients' successes!</div>
      </Content>
    </Layout>
  );
};

export default StudyPage;
