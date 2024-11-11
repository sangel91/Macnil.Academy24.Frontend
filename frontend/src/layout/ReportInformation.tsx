import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,

};

export default function ReportInformation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}><img src="/search_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.png" alt="Icon" width="24" height="24" className='icon' /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='div-close-button'>
               <Button onClick={handleClose}><img src="/close_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg" alt="Icon" width="24" height="24" className='icon' />CLOSE</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}