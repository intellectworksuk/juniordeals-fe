import { displaySuccessNotification } from "../../util/notifications";

interface PageEvents {
  status: string;
  statusStore: Map<string, string>;
  error: string;
}
export const PageEvents = (props: PageEvents) => {
  if (props.status && props.statusStore) {
    displaySuccessNotification(props.statusStore.get(props.status)!);
  }
  if (props.error) {
    displaySuccessNotification(props.statusStore.get(props.status)!);
  }
  return <></>;
};
