import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../Redux/article"

const Demo = () => {

    const [ getSummary , {error, isFetching }] = useLazyGetSummaryQuery();

    const [ article, setArticle ] = useState({
        url: '',
        summary: '',
    })

    const [ allArticles, setAllArticles ] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data }  = await getSummary({ articleUrl: article.url})

        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary }
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
        </div>

        {/* display results */}
    </section>
  )
}

export default Demo