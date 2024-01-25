import { logo } from '../assets'

const Hero = () => {
  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt='summary_logo'
            className='w-28 object-contain'/>

            <button 
                type='button' 
                onClick={()=> window.open('https://Vader2K')}
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