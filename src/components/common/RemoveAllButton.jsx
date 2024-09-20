import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveAllButton = ({ onOpenDeleteAllModal, disabled }) => (
  <Tooltip title="Delete All">
    <IconButton color="error" onClick={onOpenDeleteAllModal} disabled={disabled}>
      <DeleteOutlined />
    </IconButton>
  </Tooltip>
)

export default RemoveAllButton
