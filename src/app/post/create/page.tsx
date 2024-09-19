import {
  Breadcrumbs,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface PostCreateFormData {
  title: string;
  content: string;
  createdBy: string;
}


export default function PostCreatePage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<PostCreateFormData>();
  const { mutate } = useMutation({
    mutationKey: ['create-post'],
    mutationFn: (data: PostCreateFormData) =>
      axios.post('http://localhost:3001/posts', {
        title: data.title,
        content: data.content,
        author: data.createdBy,
      }),
    onSuccess: () => {
      enqueueSnackbar('게시글 작성 완료', { variant: 'success' });
      navigate('/post/list');
    },
  });

  const handleFormSubmut = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Stack py={4} spacing={4}>
      <Stack px={4}>
        <Breadcrumbs>
          <Typography>게시글 관리</Typography>
          <Typography>작성</Typography>
        </Breadcrumbs>
        <Typography variant='h4'>게시글 작성</Typography>
      </Stack>
      <Divider />
      <Stack
        px={4}
        spacing={3}
        maxWidth='700px'
        component='form'
        onSubmit={handleFormSubmut}>
        <TextField
          label='제목'
          autoFocus
          {...register('title', {
            required: '제목을 입력해주세요.',
            minLength:{
              value:2,
              message: '최소 2자 이상 입력하세요.',
            },  
          })}
          error={!!formState.errors.title}
          helperText={formState.errors.title?.message}
        />
        <TextField
          label='내용'
          multiline
          rows={3}
          {...register('content', {
            required: '내용을 입력해주세요.',
          })}
          error={!!formState.errors.content}
          helperText={formState.errors.content?.message}
        />
        <TextField
          label='작성자'
          {...register('createdBy', {
            required: '작성자를 입력해주세요.',
          })}
          error={!!formState.errors.content}
          helperText={formState.errors.content?.message}
        />
        <Button type='submit' variant='contained'>
          작성 완료
        </Button>
      </Stack>
    </Stack>
  );
}
