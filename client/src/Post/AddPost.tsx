import { useState, useRef, useContext } from 'react';
import { ApolloCache, useMutation } from '@apollo/client';
import { CREATE_POST } from 'graphql/post/mutations';
import { Loading } from 'Loader';
import {
  createStyles,
  makeStyles,
  Fab,
  Theme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Button,
  Divider
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { AppContext } from 'Context';
import { IPost } from 'Post';
import { POST_FRAGMENT } from 'graphql/fragments/post';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'auto'
    },
    field: {
      paddingTop: 15,
      paddingBottom: 20
    },
    button: {
      color: blue[900],
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    previewImage: {
      backgroundSize: 'cover',
      width: 300,
      height: 200,
      border: '1px dashed black',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 30,
      marginTop: 10
    }
  })
);

const AddPost = () => {
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const inputEl = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [create, { loading: createLoading, error: createError }] = useMutation(
    CREATE_POST,
    {
      update(cache: ApolloCache<any>, { data }) {
        console.log('create', data);
        cache.modify({
          fields: {
            posts(
              existing: { posts: Array<IPost>; totalPages: number } = {
                posts: [],
                totalPages: 0
              }
            ) {
              const newPostRef = cache.writeFragment({
                data: { __typename: 'Post', ...data.create },
                fragment: POST_FRAGMENT
              });
              return [newPostRef, ...existing?.posts];
            }
          }
        });
      }
    }
  );

  const convertToBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = err => reject(err);
    });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = (await convertToBase64(file)) as string;
      setImageSrc(imageUrl);
    }
  };

  const handleClose = () => {
    setImageSrc('');
    setTitle('');
    setContent('');
    setOpen(false);
  };

  const openFileSelector = (): void => inputEl.current?.click();

  if (createLoading) return <Loading />;

  return (
    <>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} maxWidth='sm' fullWidth={true} onClose={handleClose}>
        <DialogTitle>Add a new Post</DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.form} noValidate>
            {imageSrc ? (
              <>
                <div
                  className={classes.previewImage}
                  style={{ backgroundImage: `url(${imageSrc})` }}
                  onClick={openFileSelector}
                />
              </>
            ) : (
              <FormControl>
                <Fab
                  component='span'
                  className={classes.button}
                  onClick={openFileSelector}
                >
                  <AddPhotoAlternateIcon color='primary' />
                </Fab>
                <input
                  type='file'
                  hidden
                  ref={inputEl}
                  onChange={handleChange}
                />
              </FormControl>
            )}

            <FormControl fullWidth={true} className={classes.field}>
              <TextField
                placeholder='Title'
                fullWidth
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </FormControl>
            <FormControl fullWidth={true} className={classes.field}>
              <TextField
                placeholder='Content'
                fullWidth
                value={content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContent(e.target.value)
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            disabled={!title || !content}
            onClick={async () => {
              await create({
                variables: {
                  title,
                  content,
                  userId: user?.id,
                  username: user?.username,
                  imageSrc
                }
              });
            }}
          >
            Add
          </Button>
          <Button color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPost;
