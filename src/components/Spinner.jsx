import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Span = styled(motion.span)`
  display: block;
  width: 50px;
  height: 50px;
  border: 7px solid #eee;
  border-top: 7px solid #2d3134;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

// Perfectly round container with top border that spins

const spinTransition = {
  repeat: Infinity,
  ease: 'easeInOut',
  // width: ['100%', '50%'],
  duration: 1,
};

const Spinner = () => {
  return (
    <Container>
      <Span animate={{ rotate: 360 }} transition={spinTransition} />
    </Container>
  );
};

export default Spinner;
