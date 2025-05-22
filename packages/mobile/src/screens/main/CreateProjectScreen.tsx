import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const CreateProjectScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');

  const handleSubmit = () => {
    // TODO: プロジェクト作成のAPI呼び出し
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* プロジェクト名 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>プロジェクト名</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="プロジェクト名を入力"
            />
          </View>

          {/* 説明 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>プロジェクト概要</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="プロジェクトの説明を入力"
              multiline
              numberOfLines={6}
            />
          </View>

          {/* カテゴリー */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>カテゴリー</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="例: AI/教育, モビリティ"
            />
          </View>

          {/* 必要なスキル */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>募集スキル</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={requiredSkills}
              onChangeText={setRequiredSkills}
              placeholder="必要なスキルをカンマ区切りで入力"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* 作成ボタン */}
          <View style={styles.buttonContainer}>
            <Button
              title="プロジェクトを作成"
              onPress={handleSubmit}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
}); 