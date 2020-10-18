import * as React from 'react'
import * as networkAPI from '../api/network'
import { useQuery } from 'react-query'

export function useDocuments() {
  const [vc, setVC] = React.useState<any[]>([])
  const [documents, setDocuments] = React.useState<any[]>([])

  const { isLoading, refetch } = useQuery('documents', networkAPI.getAllMyVCs, {
    refetchInterval: 1000 * 10,
    onSuccess: async (data) => {
      const sortedData = [...data].sort((vc1, vc2) => {
        if (vc1.status === 'AWAITING_SIGNATURE') return -1
        if (vc1.status === 'ISSUED') return 1
        return 2
      })

      console.log(sortedData)

      setVC(sortedData)
      const updatedDocs = await getAllInfos(sortedData)
      setDocuments(updatedDocs)
    },
  })

  return { documents, isLoading, refetch }
}

function getAllInfos(vcs: any[]) {
  return Promise.all(vcs.map(handleDocumentInfoDownload))
}

async function handleDocumentInfoDownload({ id, status }: any) {
  const result = await networkAPI.getVcChallenge(id)
  return { ...result, id, status }
}
