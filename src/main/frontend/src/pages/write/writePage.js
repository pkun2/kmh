// 글쓰기 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import TextEditor from '../../components/TextEditor';

import styles from './writePage.module.css';
import {postData} from "../../services";
import {useParams} from "react-router-dom";

const WritePage = () => {
  const { channelName } = useParams();
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
      channelName: channelName,
      goodCount: 0,
      badCount: 0,
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}`}
    };

    try {
      const response = await postData(items, "api/posts/create", config);
      console.log(response);

      // 백엔드와 통신에 성공에 200을 받으면, 페이지 이동
      if (response.status === true) {
        navigate(`/${channelName}`);
      } else {
        console.log("오류 발생! 백엔드와 통신 오류!");
      }
    } catch (error) {
      console.log(error);
    }
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
