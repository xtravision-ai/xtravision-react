export enum XTRAButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INHERIT = "inherit",
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export type XTRAButtonProps = {
  text: string;
  type?: XTRAButtonType;
  onClick?: (e: any) => any;
  disabled?: boolean;
  submitButton?: boolean;
  classes?: any;
  isOutlined?: boolean;
  startIcon?: any;
  endIcon?: any;
  loading?: boolean;
  nomargin?: boolean;
  size?: "small" | "medium" | "large";
};
