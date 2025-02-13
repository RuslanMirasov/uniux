import { Logo, FormWrapper, Text, Title } from './../components';

const TosPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          UniUX TOS
        </Title>

        <Text align="left" color="grey">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptates et nam accusamus veniam quos
          doloremque facilis nulla placeat voluptate ullam exercitationem, corrupti culpa ratione tempora explicabo
          consequuntur eum! Quos?
        </Text>

        <Text align="left" color="grey">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptates et nam accusamus veniam quos
          doloremque facilis nulla placeat voluptate ullam exercitationem, corrupti culpa ratione tempora explicabo
          consequuntur eum! Quos?
        </Text>

        <Text align="left" color="grey">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptates et nam accusamus veniam quos
          doloremque facilis nulla placeat voluptate ullam exercitationem, corrupti culpa ratione tempora explicabo
          consequuntur eum! Quos?
        </Text>
      </FormWrapper>
    </>
  );
};

export default TosPage;
