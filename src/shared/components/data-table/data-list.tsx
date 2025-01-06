"use client"
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import { useDeleteDocument, useGetDocuments } from "@/shared/firebase-services/useCollections";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { usePostData } from "@/shared/firebase-services/mutations";
import { EditIcon, Eye, EyeSlash, Trash } from "@/shared/icons/common";
import DataTable from "@/shared/components/data-table";
import InfoModal from "@/shared/components/modal/info";
import { Mode } from "@/routes";

const DataList = ({
  collectionId,
  directoryParentKey,
  tableDataKeyList,
  showActionsColumn = true,
  showDeleteButton = true,
  showSmartApprove = true,
  showEditButton = true,
  showEyeIcon = true,
  isStrikeThroughEffect = true,
  hideSearch,
  hideExport
}: ContentControllerProps) => {
  const { mutate: update } = usePostData(collectionId, () => {});
  const { isLoading, data } = useGetDocuments(collectionId);
  const { isLoading: isProcessing, mutate } = useDeleteDocument(
    collectionId,
    () => setConfirmationModal(null)
  );

  const pathName = usePathname();

  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    id: string | null;
    title: string;
    directory: string | null;
  } | null>(null);

  const ContentList: TableDataKeyList[] | [] = useMemo(() => {
    if (showActionsColumn) {
      return [
        ...tableDataKeyList,
        {
          data_key: "actions",
          title: "Actions",
          headerCellCssClass: "justify-content-center",
          cell: (item: GenericObject) => {
            return (
              <div className="d-flex gap-3 justify-content-center">
                <ConditionalRenderer
                  condition={showEditButton && !item?.is_archived}
                >
                  <Link
                    href={`${pathName}?mode=${Mode?.edit}&documentId=${item?.id}`}
                  >
                    <EditIcon className="text-warning general-hover-cursor" />
                  </Link>
                </ConditionalRenderer>
                <ConditionalRenderer condition={showEyeIcon}>
                  <div
                    onClick={() => {
                      update({
                        collectionId: collectionId,
                        dataId: item?.id,
                        data: { ...item, is_archived: !item?.is_archived }
                      });
                    }}
                  >
                    <ConditionalRenderer
                      condition={item?.is_archived}
                      component={
                        <Eye className="text-info general-hover-cursor" />
                      }
                    >
                      <EyeSlash className="text-info general-hover-cursor" />
                    </ConditionalRenderer>
                  </div>
                </ConditionalRenderer>
                <ConditionalRenderer condition={showDeleteButton}>
                  <div
                    onClick={() =>
                      setConfirmationModal({
                        open: true,
                        id: item?.id!,
                        title: item?.title!,
                        directory: directoryParentKey
                          ? item[directoryParentKey]?.directory
                          : item?.directory
                      })
                    }
                  >
                    <Trash className="text-danger general-hover-cursor" />
                  </div>
                </ConditionalRenderer>
                {/* <ConditionalRenderer condition={showSmartApprove}>
    
                    </ConditionalRenderer> */}
              </div>
            );
          }
        }
      ];
    }
    return tableDataKeyList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableDataKeyList, showActionsColumn, showEditButton, showDeleteButton]);

  return (
    <>
      <DataTable
        data={data}
        headerList={ContentList}
        isLoading={isLoading}
        hideSearch={hideSearch}
        hideExport={hideExport}
        isStrikeThroughEffect={isStrikeThroughEffect}
      />
      <ConditionalRenderer condition={confirmationModal}>
        <InfoModal
          modalData={confirmationModal!}
          close={() => setConfirmationModal(null)}
          type="info"
          message={`Are you sure want to delete`}
          onSuccess={() =>
            mutate({
              collectionType: collectionId,
              id: confirmationModal?.id!,
              directory: [confirmationModal?.directory!]
            })
          }
        />
      </ConditionalRenderer>
      <ScreenLoader loading={isProcessing} />
    </>
  );
};

export default DataList;
