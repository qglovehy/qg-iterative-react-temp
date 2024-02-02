export interface IImgProps {
  src?: string;
  alt?: string;
  replace?: string;
  className?: string;
  style?: object;
  handleError?: (e: any, replace: any) => void;
}
