import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../Redux/article"

const Demo = () => {
    // calling my get summary endpoint using lazy keyword to get my summary after the submit button is clicked.
    const [ getSummary , {error, isFetching }] = useLazyGetSummaryQuery();
    // getting and setting my article states
    const [ article, setArticle ] = useState({
        url: '',
        summary: '',
    })
    // this states is used to set and get the article search history (all url entered) as an array
    const [ allArticles, setAllArticles ] = useState([])

    // a handle submit button function that performs the api call from the react redux and fertches the data
    const handleSubmit = async (e) => {
        e.preventDefault() //prevents the page from refreshing.

        //this code retrieves the summary data from the given article URL using the getSummary function.
        const { data } = await getSummary({ articleUrl: article.url });

        if(data?.summary) {
            //if there is a summary, create a new article and spread the old article then set summary to the data
            const newArticle = { ...article, summary: data.summary }
            //now to save the search history which is the artile url
            //spread all articles into a new array and push the newArticle into it too
            const updatedAllArticles = [newArticle, ...allArticles]

            setArticle(newArticle)
            setAllArticles(updatedAllArticles)
            console.log(newArticle)
            localStorage.setItem('article', JSON.stringify(updatedAllArticles))
        }
    }

    //now that we have the article search history, we want to store it so even if we restart the page,
    //we wont lose our search history.
    //so we want to store our updatedAllArticle in our local storage by using useEffect.
    useEffect(()=> {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('article')
        )
        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage)
            //local storage can only contain strings
        }
    }, [])
  return (
    <section className="mt-16 w-full max-w-xl">
        {/* search */}
        <div className="flex flex-col w-full gap-2">
            <form
                className="relative flex justify-center items-center"
                onSubmit={handleSubmit}
            >
                <img 
                    src={linkIcon} 
                    alt="link_icon" 
                    className="absolute left-0 my-2 ml-3 w-5"/>
                <input 
                    type="url" 
                    placeholder="Enter a URL"
                    value={article.url}
                    onChange={(e)=> setArticle({
                        ...article, url:e.target.value
                    })}
                    required
                    className="url_input peer"
                />

                <button
                    type="submit"
                    className="submit_btn
                    peer-focus:border-gray-700
                    peer-focus:text-gray-700"                    
                >
                    ?
                </button>
            </form>

            {/* browser url history */}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map((item, index) => (
                    <div 
                        key={`link-${index}`}
                        onClick={()=> setArticle(item)}
                        className="link_card"
                    >
                        <div className="copy_btn">
                            <img 
                                src={copy} 
                                alt="copy_icon" 
                                className="w-[40%] h-[40%] object-contain"
                            />
                        </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                            {item.url}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* display results */}
        <div className="my-10 max-w-full flex justify-center items-center">
            {
                isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">
                        well, that wasn't supposed to happen
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error.data.data}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-2">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Article <span className="blue_gradient">Summary</span>
                            </h2>
                            <div className="summary_box">
                                <p>{article.summary}</p>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    </section>
  )
}

export default Demo