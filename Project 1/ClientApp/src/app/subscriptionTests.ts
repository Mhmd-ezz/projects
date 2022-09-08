`
dotnet build
dotnet run

subscription messageAdded($groupName: String!) {
    joinChat(groupName: $groupName) {
      content
      from
      content
    }
  }
  
  {
    "groupName": "3"
  }
  


  mutation messageAdded($group: String!, $msg: MessageInputType!) {
    addMessage(group: $group, message: $msg) {
      from
      content
      groupName
    }
  }
  {
    "group": "1",
    "msg": {
      "from": "hasan",
      "content": "hello"
    }
  }
  
  `
