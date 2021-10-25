import { ofType } from "redux-observable";
import { map, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { BACKEDN_SERVER } from "../../../config";

import {
  GET_CAR_LIST,
  getCarListSuccess,
  getCarListError,
} from "./actions";

export const getCarListEpic = (action$, state$) =>
  action$.pipe(
    ofType(GET_CAR_LIST),
    mergeMap((action) => {
      const { make, type, year } = action.payload
      let url = `${BACKEDN_SERVER}/vehicles/getmodelsformake/${make}?format=json`
      if (year && !type) {
        url = `${BACKEDN_SERVER}/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
      } else if (!year && type) {
        url = `${BACKEDN_SERVER}/vehicles/GetModelsForMakeYear/make/${make}/vehicletype/${type}?format=json`
      } else if (year && type) {
        url = `${BACKEDN_SERVER}/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}?format=json`
      }

      return ajax(url).pipe(
        map(({ response }) => getCarListSuccess(response.Results)),
        catchError((error) => of(getCarListError(error)))
      );
    })
  );