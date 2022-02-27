import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { XTRAButtonProps, XTRAButtonType } from './XButton.types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    margin: ({ nomargin = false }: any) => (nomargin ? 0 : '5px'),
    position: 'relative',
    width: 'fit-content',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const XTRAButton = ({
  text,
  type = XTRAButtonType.PRIMARY,
  onClick,
  disabled = false,
  submitButton = false,
  classes,
  isOutlined = false,
  startIcon,
  endIcon,
  nomargin = false,
  loading = false,
  size = 'medium',
}: XTRAButtonProps) => {
  const localClasses = useStyles({ nomargin });
  return (
    <div className={classes}>
      <div className={localClasses.buttonsContainer}>
        <Button
          color={type}
          onClick={onClick}
          disabled={loading || disabled}
          variant={isOutlined ? 'outlined' : 'contained'}
          type={submitButton ? 'submit' : 'button'}
          startIcon={startIcon}
          endIcon={endIcon}
          style={{ fontFamily: 'CircularStd' }}
          size={size}
        >
          {text}
        </Button>
        {loading && (
          <CircularProgress size={24} className={localClasses.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default XTRAButton;
