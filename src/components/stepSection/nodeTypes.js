import NotSuccessfulEnd from '../../renderer/customNodes/NotSuccessfulEnd';
import SuccessfulEnd from '../../renderer/customNodes/SuccessfulEnd';
import Conditional from '../../renderer/customNodes/Conditional';
import Common from '../../renderer/customNodes/Common';
import Start from '../../renderer/customNodes/Start';
import YesNode from '../../renderer/customNodes/YesNode';
import NoNode from '../../renderer/customNodes/NoNode';

const nodeTypes = {
    Start: Start,
    Common: Common,
    Conditional: Conditional,
    NoNode: NoNode,
    YesNode: YesNode,
    NotSuccessfulEnd: NotSuccessfulEnd,
    SuccessfulEnd: SuccessfulEnd
};
export default nodeTypes;