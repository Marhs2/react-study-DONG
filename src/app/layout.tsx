import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  useTheme,
  IconButton,
  Tooltip,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  ListSubheader,
  Avatar,
  GlobalStyles,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import VillaIcon from '@mui/icons-material/Villa';

export default function Layout() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(!matches);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useLayoutEffect(() => {
    setOpen(!matches);
  }, [matches]);

  return (
    <Stack height='100vh'>
      <GlobalStyles
        styles={{
          'html, body': {
            scrollPaddingTop: '4rem',
            scrollPaddingBottom: '1rem',
          },
          ':is(html, body):has(aside)': {
            scrollPaddingBottom: '4rem',
          },
        }}
      />
      <AppBar
        color='inherit'
        component='header'
        elevation={0}
        position='fixed'
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: theme.palette.divider,
          transition: 'all 200ms',
          zIndex: theme.zIndex.drawer + 1,
        }}
        variant='elevation'>
        <Toolbar>
          <Stack alignItems='center' direction='row' width='100%'>
            <Stack alignItems='center' direction='row' spacing={1}>
              <Tooltip title={open ? '메뉴 닫기' : '메뉴 열기'}>
                <IconButton onClick={handleOpen}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Stack alignItems='center' component={Link} to='/home'>
                <Box component='img' src='/static/app-logo.webp' width='80px' />
              </Stack>
            </Stack>
            <Stack flex='1' />
            <Stack alignItems='center' direction='row' spacing={2}>
              <Tooltip title='프로필'>
                <Avatar>
                  <PersonIcon fontSize='large' />
                </Avatar>
              </Tooltip>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        sx={{
          width: '240px',
          flexShrink: 0,
          ...(!open && matches && { display: 'none' }),
          [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
        }}
        variant={matches ? 'temporary' : 'persistent'}>
        <Toolbar />
        <Stack overflow='auto'>
          <List>
            <ListItem disablePadding>
              <ListItemButton href='/'>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>홈</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List subheader={<ListSubheader>게시글 관리</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton href='/post/list'>
                <ListItemIcon>
                  <VillaIcon />
                </ListItemIcon>
                <ListItemText>게시글 목록</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/post/create'>
                <ListItemIcon>
                  <VillaIcon />
                </ListItemIcon>
                <ListItemText>게시글 작성</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Stack>
      </Drawer>
      <Stack
        component='main'
        pl={open && !matches ? '240px' : '0px'}
        sx={{
          flex: 1,
          minHeight: 0,
          transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            transition: theme.transitions.create('padding', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}>
        <Toolbar />
        <Outlet />
      </Stack>
    </Stack>
  );
}
