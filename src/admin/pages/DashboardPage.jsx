import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const DashboardPage = () => {
  // Dữ liệu ví dụ cho các cuộc bầu cử
  const [elections, setElections] = useState([
    {
      id: 1,
      name: 'Cuộc bầu cử 1',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      candidates: ['Nguyễn Văn A', 'Trần Thị B'],
    },
    {
      id: 2,
      name: 'Cuộc bầu cử 2',
      startDate: '2025-11-01',
      endDate: '2025-11-30',
      candidates: ['Lê Thị C', 'Phan Văn D'],
    },
  ]);

  const totalElections = elections.length;
  const ongoingElections = elections.filter(
    (election) => new Date(election.startDate) <= new Date() && new Date(election.endDate) >= new Date()
  ).length;

  const upcomingElections = elections.filter(
    (election) => new Date(election.startDate) > new Date()
  ).length;

  const endedElections = elections.filter(
    (election) => new Date(election.endDate) < new Date()
  ).length;

  return (
   <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Tổng số cuộc bầu cử */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tổng số cuộc bầu cử
              </Typography>
              <Typography variant="h6">{totalElections}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cuộc bầu cử đang diễn ra */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Cuộc bầu cử đang diễn ra
              </Typography>
              <Typography variant="h6">{ongoingElections}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cuộc bầu cử sắp tới */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Cuộc bầu cử sắp tới
              </Typography>
              <Typography variant="h6">{upcomingElections}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {/* Danh sách các cuộc bầu cử */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên cuộc bầu cử</TableCell>
                    <TableCell>Ngày bắt đầu</TableCell>
                    <TableCell>Ngày kết thúc</TableCell>
                    <TableCell>Ứng cử viên</TableCell>
                    <TableCell>Tình trạng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elections.map((election) => (
                    <TableRow hover key={election.id}>
                      <TableCell>{election.name}</TableCell>
                      <TableCell>{election.startDate}</TableCell>
                      <TableCell>{election.endDate}</TableCell>
                      <TableCell>{election.candidates.join(', ')}</TableCell>
                      <TableCell>
                        {new Date(election.startDate) > new Date()
                          ? 'Sắp tới'
                          : new Date(election.endDate) < new Date()
                          ? 'Đã kết thúc'
                          : 'Đang diễn ra'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Xem chi tiết
      </Button>
    </div>
  );
};

export default DashboardPage;
