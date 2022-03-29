docker buildx build . --platform linux/amd64 -t pub-sub-run-test -f Dockerfile

docker tag pub-sub-run-test gcr.io/${PROJECT_ID}/pub-sub-run-test

docker push gcr.io/${PROJECT_ID}/pub-sub-run-test

gcloud run deploy pub-sub-run-test --image gcr.io/${PROJECT_ID}/pub-sub-run-test --region asia-east1

gcloud run services add-iam-policy-binding pub-sub-run-test \
    --member=serviceAccount:pub-sub-test@${PROJECT_ID}.iam.gserviceaccount.com \
    --role=roles/run.invoker \
    --region asia-east1