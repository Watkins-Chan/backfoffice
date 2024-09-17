import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { UploadOutlined } from '@ant-design/icons'

const FileUploadButton = ({ onFileUpload }) => (
  <Tooltip title="Upload file">
    <IconButton component="label">
      <input type="file" hidden onChange={onFileUpload} accept=".xlsx" />
      <UploadOutlined />
    </IconButton>
  </Tooltip>
)

export default FileUploadButton
