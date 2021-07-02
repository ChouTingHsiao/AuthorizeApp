
const UsersState = {
  Users: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const RolesState = {
  Roles: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const GroupsState = {
  Groups: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const GroupProgramsState = {
  GroupPrograms: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const ProgramsState = {
  Programs: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const ButtonsState = {
  Buttons: {
    ids: [],
    entities: {},
    selectedUserId: null
  }
};

const MenusState = {
    Menus: {
      ids: ['1', '2', '3', '4', '5'],
      entities: {
        1: {
          id: '1',
          name: 'User',
          program: '1'
        },
        2: {
          id: '2',
          name: 'Role',
          program: '2'
        },
        3: {
          id: '3',
          name: 'Group',
          program: '3',
          linkTag: 'Group'
        },
        4: {
          id: '4',
          name: 'Program',
          program: '4',
          linkTag: 'Program'
        },
        5: {
          id: '5',
          name: 'Menu',
          program: '5',
          linkTag: 'Menu'
        }
      },
      selectedUserId: null
    }
};

export { UsersState, RolesState, GroupsState, GroupProgramsState, ProgramsState, ButtonsState, MenusState };
