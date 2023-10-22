import { List, ActionPanel, Action } from "@raycast/api";

import { getImageUrl } from "../lib/cloudinary";
import { getUploadSuccessItems } from "../lib/extension";
import type { Asset } from "../types/asset";

interface ViewResourceProps {
  isLoading?: boolean;
  resource?: Asset;
}

function ViewResource({ resource, isLoading }: ViewResourceProps) {
  const listItems = getUploadSuccessItems(resource as Asset);

  return (
    <List isShowingDetail isLoading={isLoading}>
      {listItems?.map((item) => {
        return (
          <List.Item
            key={item.title}
            title={item.title}
            icon={item.icon}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content={item.assetUrl} />
              </ActionPanel>
            }
            detail={<List.Item.Detail markdown={item.detail} />}
          />
        );
      })}
    </List>
  );
}

export default ViewResource;
