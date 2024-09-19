import {
  Breadcrumbs,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PostRowProps {
  no: number;
  title: string;
  createdBy: string;
}

function PostRow({ no, title, createdBy }: PostRowProps) {
  return (
    <TableRow>
      <TableCell>{no}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{createdBy}</TableCell>
    </TableRow>
  );
}

interface PostData {
  id: number;
  title: string;
  author: string;
}

export default function PostListPage() {
  const {data ,isPending,isError} = useQuery<PostData[]>({
    queryKey: ['post-list'],
    queryFn: () => axios.get('http://localhost:3001').then((res) => res.data),
  });

  return (
    <Stack py={4}>
      <Stack px={4}>
        <Breadcrumbs>
          <Typography>게시글 관리</Typography>
          <Typography>목록</Typography>
        </Breadcrumbs>
        <Typography variant='h4'>게시물 목록</Typography>
      </Stack>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isPending &&
              !isError &&
              data.map((item) => (
                <PostRow
                  key={item.id}
                  no={item.id}
                  title={item.title}
                  createdBy={item.author}
                />
              ))}
            <PostRow no={1} title='게시글 제목1' createdBy='안녕1' />
            <PostRow no={2} title='게시글 제목2' createdBy='안녕2' />
            <PostRow no={3} title='게시글 제목3' createdBy='안녕3' />
            <PostRow no={4} title='게시글 제목4' createdBy='안녕4' />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
