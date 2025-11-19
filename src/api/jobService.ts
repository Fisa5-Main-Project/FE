// src/api/jobService.ts
import { apiClient } from "./index";
import { handleApiCall } from "./apiHandler";
import type { JobListResponse, JobDetailResponse } from "@/types/job"; // 경로 확인

// 리스트 조회 API
export const fetchJobs = (
  search: string,
  employmentType: string,
  page: number = 1
) => {
  return handleApiCall<JobListResponse>(
    () =>
      apiClient.get("/jobs", {
        params: { search, employmentType, page },
      }),
    "채용 공고를 불러오는데 실패했습니다."
  );
};

// 상세 조회 API
export const fetchJobDetail = (jobId: string) => {
  return handleApiCall<JobDetailResponse>(
    () => apiClient.get(`/jobs/${jobId}`),
    "채용 공고 상세 정보를 불러오는데 실패했습니다."
  );
};
