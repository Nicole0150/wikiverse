import React from 'react';
import apiURL from '../api';

export const PageDetails = ({page, setSelectedPage, setPages, pages}) => {
  
  const {
    title,
    content,
    author,
    createdAt,
    tags
  } = page;

  const deletePage = async slug => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`, {
        method: "DELETE"
      });
      const data = await response.json();
      console.log('>>>>>>>>> data', data);
      
      if(data) {
        setSelectedPage(null);
        setPages(pages.filter(page => page.slug !== slug));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <>
    <h2>{title}</h2>
    <p><b>Author:</b> {author.name}</p>
    <p><b>Published:</b> {new Intl.DateTimeFormat('en-US',{month:'2-digit',day:'2-digit', year:'numeric'}).format(new Date(createdAt))}</p>
    <p>{content}</p>
    <div><b>Tags:</b> {tags.map((tag, idx) => <p key={idx}>{tag.name}</p>)}</div>
    <button onClick={() => deletePage(page.slug)}>DELETE</button>
    <button onClick={() => setSelectedPage(null)}>Back to Wiki List</button>
  </>
} 
	