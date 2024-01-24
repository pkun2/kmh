// 글쓰기 페이지
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TextEditor from '../../components/TextEditor';

import styles from './writePage.module.css';
import {postData} from "../../services";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(['자유']);
  const [content, setContent] = useState(" ");
  const [showCategoryList, setShowCategoryList] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryClick = () => {
    setShowCategoryList(!showCategoryList);
  };

  const handleCategorySelect = (category) => {
    setTags([category]);
    setShowCategoryList(false);
  };

  const handleUpload = async () => {
    const items = {
      title: title,
      content: content.replace(/<\/?p>/g, ""),
      viewCount: 0,
      categoryTag: tags[0],
      channel: {
        channel_id: 10,
        channel_name: "test",
      },
      goodCount: 0,
      badCount: 0,
    };

    const response = await postData(items, "api/posts/create");

    console.log(response);
  };

  return (
    <div>
      <input type="text" className={styles.titleInput} value={title} onChange={handleTitleChange} placeholder="제목" />
      <div className={styles.categorySelector} onClick={handleCategoryClick}>
        <div className={styles.selectedCategory}>{tags[0]}</div>
        {showCategoryList && (
          <div className={styles.categoryList}>
            <div onClick={() => handleCategorySelect('자유')}>자유</div>
            <div onClick={() => handleCategorySelect('질문')}>질문</div>
            <div onClick={() => handleCategorySelect('토론')}>토론</div>
          </div>
        )}
      </div>
      <TextEditor setContent={setContent} />
      <button className={styles.uploadButton} onClick={handleUpload}>업로드</button>
    </div>
  );
}

export default WritePage;
