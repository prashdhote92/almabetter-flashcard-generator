import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllFlashcards } from '../redux/flashcardSlice'
import GroupPallete from '../components/GroupPallete/GroupPallete'

function MyFlashCards() {
    const dataObj = useSelector(selectAllFlashcards)
    
    return (
        <GroupPallete dataObj={dataObj}/>
    )
}

export default MyFlashCards