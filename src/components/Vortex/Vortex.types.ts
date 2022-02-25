interface IVortexCircle {
  name: string;
  value: number;
  dashFraction: number;
}

export interface IVortex {
  circleUnit: string;
  firstCircle: IVortexCircle;
  secondCircle: IVortexCircle;
  thirdCircle: IVortexCircle;
  fourthCircle: IVortexCircle;
}
