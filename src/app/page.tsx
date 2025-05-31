import { AppShell, AppShellHeader, AppShellMain,Button,Flex,Group,Image,Paper,Text, UnstyledButton } from "@mantine/core";

export default function Home() {
  
  return ( 
    
  <AppShell header={{height:60}}>
     <AppShellHeader withBorder={false}>
      <Paper shadow="md">
      <Group py="sm" justify="space-around">
      <Image src="\logo\AsaanDrive.png" h={20}  w="auto"/>
      <Flex gap={25.37}>
      <UnstyledButton>Home</UnstyledButton>
      <UnstyledButton>How it Works</UnstyledButton>
      <UnstyledButton>Browse Vehicles</UnstyledButton>
      </Flex>
      <Flex gap={18}>
      <Button variant="outline" color="red" radius="md">Sign in</Button>
      <Button  color="red" radius="md" >Sign up</Button>
      </Flex>
      </Group>
      </Paper>
     </AppShellHeader>
     <AppShellMain>Main</AppShellMain>
    </AppShell>  
  
   );
}
