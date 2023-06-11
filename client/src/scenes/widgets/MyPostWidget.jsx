import { useState } from "react";
import {
    IconButton,
    Box,
    Divider,
    Typography,
    InputBase,
    useMediaQuery,
    Button,
    useTheme,
} from "@mui/material";
import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
    GifBoxOutlined,
    AttachFileOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import { useSelector,useDispatch } from "react-redux";

import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
    const [post, setPost] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // console.log(token)
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async()=>{
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            const base64 = await convertTobase64(image);
            // formData.append("picture", image);
            formData.append("picturePath", base64);
        }

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
            });
            const posts = await response.json();
            dispatch(setPosts({ posts }));
            setImage(null);
            setPost("");
    }

    const convertTobase64 = (file) => {
      return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      })
    };
    
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                    {({ getRootProps, getInputProps }) => (
                        <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem"
                                width="100%"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add Image Here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                    </FlexBetween>
                                )}
                            </Box>
                            {image && (
                                <IconButton
                                    onClick={() => setImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            )}
                            </FlexBetween>
                        )}
                        </Dropzone>
                    </Box>
                )}

                <Divider sx={{ margin: "1.25rem 0" }} />

                <FlexBetween>
                    <FlexBetween onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: mediumMain }} />
                        <Typography
                            color={mediumMain}
                            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                        >
                            Image
                        </Typography>
                    </FlexBetween>

                    {isNonMobileScreens ? (
                        <>
                            <FlexBetween gap="0.25rem">
                                <GifBoxOutlined sx={{ color: mediumMain }}/>
                                <Typography color={mediumMain}>Clip</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Attachment</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Audio</Typography>
                            </FlexBetween>
                        </>
                    ) : (
                        <FlexBetween gap="0.25rem">
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>
                    )}

                    <Button
                        disabled={!post}
                        onClick={handlePost}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                        }}        
                    >
                        POST
                    </Button>
                </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;