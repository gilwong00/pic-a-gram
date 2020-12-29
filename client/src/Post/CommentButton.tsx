import {
  Typography,
  IconButton,
  makeStyles,
  createStyles
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import { IComment } from '.';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles(() =>
  createStyles({
    commentIcon: {
      color: blue[500],
      marginLeft: 5
    }
  })
);

interface IProps {
  comments?: Array<IComment>;
  handleClick: () => void;
}

const CommentButton: React.FC<IProps> = ({ comments, handleClick }) => {
  const classes = useStyles();
  const totalComments = comments?.length ?? 0;
  return (
    <>
      <IconButton
        aria-label='comment post'
        className={classes.commentIcon}
        onClick={handleClick}
      >
        {totalComments ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
      </IconButton>
      {totalComments > 0 && (
        <Typography component='p'>{totalComments}</Typography>
      )}
    </>
  );
};

export default CommentButton;
