import { logo } from '../assets'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
        <nav className='flex items-center justify-between w-full pt-3 mb-10'>
            <img src={logo} alt='summary_logo'
            className='object-contain w-28'/>

            <button 
                type='button' 
                onClick={()=> window.open('https://Vader4K')}
                className='black_btn'>
                Github
            </button>
        </nav>

        <h1 className='head_text'>
            Summarize Articles With <br className='hidden sm:block'/> 
            <span className='orange_gradient'>OpenAI GPT_4</span>
        </h1>
        <h2 className='desc'>
            Simplify your reading with summarize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
        </h2>
        
    </div>
  )
}

export default Hero