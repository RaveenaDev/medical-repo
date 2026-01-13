import { Plus, FileText } from "lucide-react";
import "./EmptyState.scss";

const EmptyState = ({
  title = "No data found",
  description = "",
  actionText,
  onAction,
  icon: Icon = FileText,
}) => {
  return (
    <div className="emptyState">
      <div className="emptyIcon">
        <Icon size={36} strokeWidth={1.5} />
      </div>

      <h4 className="emptyTitle">{title}</h4>

      {description && <p className="emptyDescription">{description}</p>}

      {actionText && onAction && (
        <button className="emptyActionBtn" onClick={onAction}>
          <Plus size={16} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
