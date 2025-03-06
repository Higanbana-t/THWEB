import React from 'react';
import { Card } from 'antd';

interface StudyCardProps {
  name: string;
  onClick: () => void;
}

const StudyCard: React.FC<StudyCardProps> = ({ name, onClick }) => {
  return (
    <Card hoverable style={{ width: 240, margin: 10 }} onClick={onClick}>
      <Card.Meta title={name} />
    </Card>
  );
};

export default StudyCard;
