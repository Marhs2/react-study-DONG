import {
    Breadcrumbs,
    Divider,
    Stack,
    TextField,
    Typography,
  } from '@mui/material';
  
  export default function PostCreatePage() {
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
        <Stack>
          <TextField />
          <TextField />
          <TextField />
        </Stack>
      </Stack>
    );
  }
  