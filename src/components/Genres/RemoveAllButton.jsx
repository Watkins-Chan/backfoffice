import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveAllButton = ({ onOpenDeleteAllModal }) => (
  <Tooltip title="Delete All">
    <IconButton color="error" onClick={onOpenDeleteAllModal}>
      <DeleteOutlined />
    </IconButton>
  </Tooltip>
)

export default RemoveAllButton
