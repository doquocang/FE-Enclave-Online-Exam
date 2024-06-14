import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import response from "./test2.json";

import responseSearch from "./test.json";

//redux
import { useSelector } from 'react-redux';

const StudyList = () => {
  const [menuData, setMenuData] = useState([]);
  const SearchValue = useSelector(state => state.studySearch.value);

  useEffect(() => {
    const fetchData = async () => {
      if (SearchValue) {
        setMenuData(responseSearch.result);
      } else {
        setMenuData(response.result);
      }
    };

    fetchData();
  }, [SearchValue]);

  const renderMenu = (data, level = "Subject") => {
    return data.map((item) => {
      let title;
      let children;
      let key;
      switch (level) {
        case "Subject":
          title = item.SubjectName;
          children = item.Children;
          key = `SubjectId-${item.SubjectId}`;
          break;
        case "Category":
          title = item.CategoryName;
          children = item.Children;
          key = `CategoryId-${item.CategoryId}`;
          break;
        case "MainSection":
          title = item.MainSectionName;
          children = item.Children;
          key = `MainSectionId-${item.MainSectionId}`;
          break;
        case "SubSection":
          title = item.SubSectionName;
          key = `SubSectionId-${item.SubSectionId}`;
          break;
        default:
          title = "";
      }

      if (children) {
        return (
          <Menu.SubMenu key={key} title={title} popupClassName="sub-menu-bar">
            {renderMenu(children, getNextLevel(level))}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={key}>{title}</Menu.Item>;
    });
  };

  const getNextLevel = (level) => {
    switch (level) {
      case "Subject":
        return "Category";
      case "Category":
        return "MainSection";
      case "MainSection":
        return "SubSection";
      default:
        return "";
    }
  };

  return (
    <Menu theme="light" className="menu-bar">
      {renderMenu(menuData)}
    </Menu>
  );
};

export default StudyList;
