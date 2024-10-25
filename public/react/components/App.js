import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { PageDetails } from './PageDetails';


// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [selectedPage, setSelectedPage] = useState(null);
	const [isAddingPage, setIsAddingPage] = useState(false);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
      <h1>WikiVerse</h1>
			{
				!isAddingPage && !selectedPage && <h2>An interesting 📚</h2>
			}
			{
				isAddingPage
					? <AddPage setIsAddingPage={setIsAddingPage} setPages={setPages} pages={pages}/>
    			: <button onClick={() => setIsAddingPage(true)}>Add a Page</button>
			}
			{
				selectedPage
					? <PageDetails page={selectedPage} setSelectedPage={setSelectedPage} setPages={setPages} pages={pages}/>
					:	<PagesList pages={pages} setSelectedPage={setSelectedPage} />
			}
		</main>
	)
}