import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { Input, AutoComplete, Space } from "antd";

// import response from "./test.json";

import { useDispatch } from "react-redux";
import { updateValue } from '../../redux/StudySearch/actions';

//api
import { searchCategoriesApi } from "../../services/UserService";

const { Search } = Input;

const SearchBox = () => {
  const [options, setOptions] = useState([]);

  //redux
  const dispatch = useDispatch();

  const extractSubSections = (data) => {
    let results = [];
    data.forEach((subject) => {
      subject.Children.forEach((category) => {
        category.Children.forEach((mainSection) => {
          mainSection.Children.forEach((subSection) => {
            results.push({
              value: subSection.SubSectionName,
              key: subSection.SubSectionId,
            });
          });
        });
      });
    });
    return results;
  };

  const handleSearch = async (value) => {
    dispatch(updateValue(value));
  };

  const handleRecommend = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      let token = localStorage.getItem("token");
      const response = await searchCategoriesApi(token, value);
      const searchResults = extractSubSections(response.result);
      setOptions(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  return (
    <AutoComplete
      className="search-box-wrapper"
      options={options}
      onSelect={onSelect}
      onSearch={handleRecommend}
    >
      <Search
        className="search-box-input"
        placeholder="Search for study e.g. TOEIC, small talk, Java, etc."
        enterButton={<SearchOutlined />}
        allowClear
        size="large"
        onSearch={handleSearch}
      />
    </AutoComplete>
  );
};

export default SearchBox;
