import { Breadcrumbs, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface PostDetailData {
  no: number;
  title: string;
  content: string;
  author: string;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [count, setCount] = useState(0)

  const { data, isError, isPending } = useQuery<PostDetailData>({
    queryKey: ['post'],
    queryFn: () =>
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => res.data),
  });


  const handleUpClick = () => {
    setCount((prev: number) => prev + 1);
  };
    return (
    <Stack py={4} spacing={4}>
      <Stack px={4}>
        <Breadcrumbs>
          <Typography>게시글 관리</Typography>
          <Link href='/post/list'>목록</Link>
          <Typography>{id}</Typography>
        </Breadcrumbs>
        <Typography variant='h4'>게시글 상세: {id}</Typography>
      </Stack>
      <Divider />
      {!isPending && !isError && (
        <Stack spacing={1} px={4}>
          <Typography variant='h5'>{data.title}</Typography>
          <Typography>{data.author}</Typography>
          <Typography>{data.content}</Typography>
        </Stack>
      )}

      <Button onClick={handleUpClick}>추가하기({count})</Button>
    </Stack>
  );
}
