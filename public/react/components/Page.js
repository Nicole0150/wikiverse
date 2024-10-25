import React from 'react';
import apiURL from '../api';

export const Page = (props) => {
  const {
    page,
    setSelectedPage
  } = props;

  async function fetchPage(){
		try {
			const response = await fetch(`${apiURL}/wiki/${page.slug}`);
			const pageData = await response.json();
			setSelectedPage(pageData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

  return <>
    <h3 onClick={fetchPage}>{props.page.title}</h3>
  </>
} 
	