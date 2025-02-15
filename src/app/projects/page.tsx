import { PrivateRoute, Logo, FormWrapper, Title, Text, GoBackWrapper, GoBack } from '../components';

const ProjectsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <GoBackWrapper>
        <GoBack />
      </GoBackWrapper>
      <Logo position="right" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Projects Page
        </Title>
        <Text color="grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
        <Text color="grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere
          unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere unde hic? Ab
          nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
        <Text color="color">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
        <Text color="grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
        <Text color="grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere
          unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere unde hic? Ab
          nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
        <Text color="grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate
          facere unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere
          unde hic? Ab nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Sapiente quidem ab dolores distinctio voluptate facere unde hic? Ab
          nulla natus ad reiciendis tenetur! Eveniet commodi ad porro cumque a deserunt?
        </Text>
      </FormWrapper>
    </PrivateRoute>
  );
};

export default ProjectsPage;
