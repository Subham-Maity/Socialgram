import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Box,Typography,useTheme} from "@mui/material";
import UserImage from './UserImage';
import FlexBetween from './FlexBetween';
import {setPost} from "state";
import DeleteIcon from "@mui/icons-material/Delete";

function Comment({userId,comment,postId}) {
    console.log(userId)
    console.log(postId)
    const token = useSelector((state)=>state.token)
    const {_id} = useSelector((state)=>state.user);
    const [user , setUser] = useState("");
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const main = palette.neutral.main;

    const getCommentUser = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    const handleDeleteComment = async() => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/${userId}/comment/delete`,{
          method:"PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment }), 
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      };

    useEffect(()=>{
        getCommentUser();
    },[comment]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FlexBetween>
            <Box sx={{display:"flex" ,alignItems:"center"}}>
                <UserImage image={user.picturePath} size="35px"/>
                <Box>
                    <Typography variant="h6" sx={{ m: "0.5rem 0rem -0.5rem 1rem"}}>{`${user.firstName} ${user.lastName}`}</Typography>
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                        {comment}
                    </Typography>
                </Box>
            </Box>
            {userId===_id && <DeleteIcon onClick={handleDeleteComment} sx={{cursor:"pointer"}} />}
        </FlexBetween>
    )
};

export default Comment