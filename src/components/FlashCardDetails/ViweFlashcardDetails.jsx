import React, { use, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFlashcardById } from '../../redux/flashcardSlice'
import FlashCardDetails from '../../pages/FlashCardDetailsPage'
import './ViweFlashcardDetails.css'
import SharePanel from '../SharePanel/SharePanel'
import { useNavigate } from 'react-router-dom'

const ViweFlashcardDetails = (props) => {
    const key = props.cardId;
    const detailObj = useSelector((state) => selectFlashcardById(state, key));
    
    const [selectedIndx, setSelectedIndx] = useState(0);
    const groupName = detailObj?.groupName;
    const desc = detailObj?.description;
    const flashCards = detailObj?.flashCards || [];
    const [shareComponentVisible, setshareComponentVisible] = useState(false)
    const handleShareComponentVisibility = (visibility) => {
        setshareComponentVisible(visibility)
    }
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div className='group_title'>
                    <div className='back-btn'>
                        <img height='25px' src='/back.png' onClick={()=>navigate(-1)}></img>
                    </div>
                    <div>
                        <div className='FlashcardTitle'> {groupName}</div>
                        <div className='FlashcardDes'> {desc}</div>
                    </div>
                </div>
                <div className='panels'>
                    <div className='panel' >
                        <div className='fc_title'>Flashcards</div>
                        {flashCards.map((fc, index) => (
                            <div className={selectedIndx == index ? "FlashCardName select" : "FlashCardName"} onClick={() => setSelectedIndx(index)} key={index}>{fc.term}</div>
                        ))}
                    </div>
                    <div className="FlashcardInfo panel">
                        <div className='fc_image card_img'>
                            <img className='card_img' src={flashCards[selectedIndx].image}></img>
                        </div>
                        <div className='fc_description'>{flashCards[selectedIndx].description}</div>
                    </div>
                    <div className="Share">
                        <div className='panel' onClick={() => { setshareComponentVisible(true) }}>
                            <img className='shareIcn' src='/share2.png'></img>
                            <span>Share</span>
                        </div>
                        <div className='panel'>
                            <img className='shareIcn' src='/download.png'></img>
                            <span>Download</span>
                        </div>
                        <div className='panel'>
                            <img className='shareIcn' src='/printer.png'></img>
                            <span>Print</span>
                        </div>
                    </div>
                </div>

                <div className='pageNav'>
                    <span className='navBtn' onClick={() => { setSelectedIndx(+selectedIndx - 1 < 0 ? flashCards.length - 1 : selectedIndx - 1) }}>{"<"}</span>
                    <span className='navBtn'>{selectedIndx + 1}/{flashCards.length}</span>
                    <span className='navBtn' onClick={() => { setSelectedIndx((selectedIndx + 1) % (flashCards.length)) }}>{">"}</span>
                </div>

                {shareComponentVisible == true ? <SharePanel onChange={handleShareComponentVisibility} /> : <></>}

            </div>
        </>
    )
}

export default ViweFlashcardDetails