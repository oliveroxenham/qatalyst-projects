import { MethodCreateProjectEnum } from '@/app/(authenticated)/projects/new/components/ChooseMethod';
import { QatalystProjectTypeEnum } from '@/app/(authenticated)/projects/new/components/ChooseQatalystProjectType';
import { Project } from '@/app/types/project';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  createdMethod: null,
  createdProject: null,
  createdQatalystType: null,
  importedId: '',
};

type CreatedProjectPayload = {
  project: Project & { id: string };
  qatalystType: QatalystProjectTypeEnum | null;
  method: MethodCreateProjectEnum | null;
  importId: string;
};

const projectSlice = createSlice({
  initialState,
  name: 'project',
  reducers: {
    clearCreatedProject: (state) => {
      state.createdQatalystType = null;
      state.createdProject = null;
      state.createdMethod = null;
      state.importedId = '';
    },
    setCreatedProject: (state, action: PayloadAction<CreatedProjectPayload>) => {
      // @ts-ignore
      state.createdQatalystType = action.payload.qatalystType;
      // @ts-ignore
      state.createdProject = action.payload.project;
      // @ts-ignore
      state.createdMethod = action.payload.method;
      state.importedId = action.payload.importId;
    },
  },
});
export const { setCreatedProject, clearCreatedProject } = projectSlice.actions;
export default projectSlice.reducer;
