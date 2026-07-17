ALTER TABLE candidates
  ADD CONSTRAINT candidates_user_id_unique UNIQUE (user_id);
