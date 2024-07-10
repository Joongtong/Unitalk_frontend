import { styled } from '@mui/material/styles';
import { 
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
} from '@mui/material';

export const PaginationButton = styled(Button)(({ theme }) => ({
}));


export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-root': {
    fontSize: '12px',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '7px',
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  '& .MuiTableCell-root': {
    fontSize: '14px',
    fontWeight: 'bold',
    height: '32px',
  }
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '32px',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: '#A51C30',
  borderWidth: '1px',
  borderStyle: 'solid',
  color: '#A51C30',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  '&:hover': {
    backgroundColor: '#A51C30',
    color: '#fff',
  },
  '&.Mui-disabled': {
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
    color: theme.palette.text.disabled,
  },
}));